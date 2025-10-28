<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import type { Profile } from '@/types/profile'
import { ref, defineProps } from 'vue'
import { useProfile } from '@/composables/useProfile';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Ticket,
} from 'lucide-vue-next'
import NavMain from '@/components/admin/NavMain.vue'
import NavProjects from '@/components/admin/NavProjects.vue'
import NavUser from '@/components/admin/NavUser.vue'
import TeamSwitcher from '@/components/admin/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const { profile, isLoaded, error, fetchProfile } = useProfile()
const localForm = ref({ ...profile.value})
// This is sample data.
const data = {
  user: {
    name: localForm.value.name ||'Name Surname',
    email: localForm.value.email || 'mock@example.com',
    avatar: localForm.value.avatar || '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Object Managment',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/admin/dashboard',
        },
        {
          title: 'Objects',
          url: '/admin/objects',
        },
        // {
        //   title: 'Settings',
        //   url: '#',
        // },
      ],
    },
    {
      title: 'tickets Management',
      url: '#',
      icon: Ticket,
      items: [
        {
          title: 'Orders',
          url: '/admin/orders',
        },
        {
          title: 'Details',
          url: '/admin/orders/details',
        },
        {
          title: 'Export(CSV,Excel)',
          url: '/admin/exports',
        },
      ],
    },
    {
      title: 'Statistics',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Tickets of objects with data',
          url: '/admin/tickets-objects',
        },
        {
          title: 'Sales of objects',
          url: '/admin/sales-of-objects',
        },
        {
          title: 'Uniq people',
          url: '/admin/unique-visitors',
        },
        // {
        //   title: 'Changelog',
        //   url: '#',
        // },
      ],
    },
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: 'General',
    //       url: '#',
    //     },
    //     {
    //       title: 'Team',
    //       url: '#',
    //     },
    //     {
    //       title: 'Billing',
    //       url: '#',
    //     },
    //     {
    //       title: 'Limits',
    //       url: '#',
    //     },
    //   ],
    // },
  ],
  projects: [
    // {
    //   name: 'Design Engineering',
    //   url: '#',
    //   icon: Frame,
    // },
    {
      name: 'Sales & Marketing',
      url: '/admin/sales-marketing',
      icon: PieChart,
    },
    // {
    //   name: 'Travel',
    //   url: '#',
    //   icon: Map,
    // },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
