import {RouterLinkStub, shallowMount} from "@vue/test-utils";
import {describe, expect, it} from 'vitest';
import SongView from "@/views/SongView.vue";

describe('SongView', () => {
   const song = {
      id: 1,
      genre: 'genre',
      url: 'url',
      commentsCount: 1,
      creatorID: 1,
      creatorName: 'creatorName',
      modifiedName: 'song modifiedName',
      originalName: 'originalName',
   }

   it('renders song properly', () => {
      const wrapper = shallowMount(SongView, {
         props: {song},
         components: {
            'RouterLink': RouterLinkStub,
         }
      });
      const songTitle = wrapper.find('.text-3xl.font-bold');
      expect(songTitle.text()).toContain('song modifiedName');
   });
})
