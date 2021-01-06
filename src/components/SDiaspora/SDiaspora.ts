/**
* Hey!
*
* SDiaspora component used for DiasporaFoundation social network
* @link https://diasporafoundation.org/
*/

import Vue, {
  CreateElement, VNode, VueConstructor,
} from 'vue';
import BaseSocial, { TBaseSocialMixin } from '@/mixins/BaseSocial/BaseSocial';
import getSerialisedParams from '@/utils/getSerialisedParams';

/**
* Share parameters for link
* @link https://share.diasporafoundation.org/about.html
*/
export interface ISDiasporaShareOptions {
  url: string;
  title?: string;
}

export default /* #__PURE__ */ (Vue as VueConstructor<Vue & InstanceType<TBaseSocialMixin<ISDiasporaShareOptions>>>).extend({
  name: 'SDiaspora',

  mixins: [BaseSocial<ISDiasporaShareOptions>()],

  computed: {
    networkURL(): string {
      const BASE_URL = 'https://share.diasporafoundation.org';
      const { shareOptions } = this;
      const { url, title } = shareOptions;
      const serialisedParams = getSerialisedParams({
        url,
        title,
      });

      return `${BASE_URL}${serialisedParams}`;
    },
  },

  render(h: CreateElement): VNode {
    return this.generateComponent(h, this.networkURL, 'Diaspora');
  },
});
