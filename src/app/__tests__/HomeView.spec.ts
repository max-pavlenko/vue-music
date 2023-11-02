import {shallowMount} from '@vue/test-utils';
import {describe, expect, test} from 'vitest';
import HomeView from '@/views/HomeView.vue';
import ListItemSong from '@/app/features/music/components/ListItemSong.vue';
import {Song} from '@/app/features/music/models/audio';

describe('HomeView', () => {
   test('renders properly', () => {
      const songs: Song[] = [{id: 1}, {id: 2}];
      const wrapper = shallowMount(HomeView, {
         data() {
            return {songs};
         },
         global: {
            mocks: {
               $t: () => {},
            }
         }
      });

      const renderedSongs = wrapper.findAllComponents(ListItemSong);
      expect(renderedSongs).toHaveLength(2);
      renderedSongs.forEach((song, index) => {
            expect(song.props().song.id).toBe(songs[index].id);
      });
   });
});
