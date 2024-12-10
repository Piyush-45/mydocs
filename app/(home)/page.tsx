import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
<Button asChild variant={'outline'}>
<Link href={'/documents/:123'}>
Create a doc
</Link>
</Button>

  )
}

export default HomePage