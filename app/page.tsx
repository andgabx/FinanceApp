import React from 'react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink } from './_components/ui/navigation-menu'

const page = () => {
  return (
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link1</NavigationMenuLink>
        <NavigationMenuLink>Link2</NavigationMenuLink>
        <NavigationMenuLink>Link3</NavigationMenuLink>
        <NavigationMenuLink>Link4</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

  )
}

export default page