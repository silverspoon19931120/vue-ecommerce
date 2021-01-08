/**
* Hey!
*
* STwitter component used for Twitter social network
* @link https://twitter.com/
*/

import Vue, {
  CreateElement, VNode, VueConstructor,
} from 'vue';
import BaseSocial, { TBaseSocialMixin } from '@/mixins/BaseSocial/BaseSocial';
import getSerialisedParams from '@/utils/getSerialisedParams';
import { getCommaSeparatedList } from '@/utils/getCommaSeparatedList';

/**
* Share parameters for link
* @link https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
*/
export interface ISTwitterShareOptions {
  text?: string;
  url?: string;
  hashtags?: string[];
  via?: string;
}

export default /* #__PURE__ */ (Vue as VueConstructor<Vue & InstanceType<TBaseSocialMixin<ISTwitterShareOptions>>>).extend({
  name: 'STwitter',

  mixins: [BaseSocial<ISTwitterShareOptions>()],

  computed: {
    networkURL(): string {
      const BASE_URL = 'https://twitter.com/intent/tweet';
      const { shareOptions } = this;
      const {
        text, url, hashtags, via,
      } = shareOptions;
      const serialisedParams = getSerialisedParams({
        text,
        url,
        hashtags: getCommaSeparatedList(hashtags),
        via,
      });

      return `${BASE_URL}${serialisedParams}`;
    },
  },

  render(h: CreateElement): VNode {
    return this.generateComponent(h, this.networkURL, 'facebook');
  },
});