import { ConvexError, v, VString } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// ! create document
export const createDocument = mutation({
  args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },

  handler: async (ctx, args) => {

    const user = await ctx.auth.getUserIdentity();
    if (user === null) {
      throw new ConvexError("Not authenticated");
    }
    const organizationId = (user.organization_id ??undefined) as string | undefined


    return await ctx.db.insert("documents", {
      title: args.title ?? "untitled document",
      ownerId: user.subject,
      organizationId:organizationId,
      initialContent: args.initialContent,
    })

  }


})


// ! get douments

export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },

  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity()
    console.log(user)

    if (!user) {
      throw new ConvexError("unauthorized")
    }

    const organizationId = (user.organization_id ?? undefined) as string | undefined

    //? search within organziation
    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => q.search("title", search).eq("organizationId", organizationId)).paginate(paginationOpts)
    }


    //!all docs inside organization

    
    if (organizationId) {
      return await ctx.db
        .query("documents").withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
        .paginate(paginationOpts);
    }

    
  //! personal search
  if (search) {
    return await ctx.db
      .query("documents").withSearchIndex("search_title", (q) => q.search("title", search)
        .eq("ownerId", user.subject))
      .paginate(paginationOpts)
  }
    // ! all perosnal docs

    return await ctx.db
      .query("documents").withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);

  },
});


// ! remove document
export const removeById = mutation({

  args: { id: v.id("documents") },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (user === null) {
      throw new ConvexError("Not authenticated");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("document not found")
    }

    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("you are not owner of this document")
    }

    return await ctx.db.delete(args.id)

  }

})



// ! update document

export const renameDocbyId = mutation({

  args: { id: v.id("documents"), title: v.string() },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (user === null) {
      throw new ConvexError("Not authenticated");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("document not found")
    }

    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("you are not owner of this document")
    }

    return await ctx.db.patch(args.id, { title: args.title })

  }

})