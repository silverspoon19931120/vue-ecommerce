/**
* Hey!
*
* SLineCount component used for Line social network
* @link https://line.me/
*/

import Vue, { VueConstructor } from 'vue';
import HTTP from '@/utils/http';
import getSerialisedParams from '@/utils/getSerialisedParams';
import BaseCount, { TBaseCountMixin } from '@/mixins/BaseCount/BaseCount';

/**
* Share parameters for link
* @link https://social-plugins.line.me/en/how_to_install#lineitbutton
*/
export interface ISLineCountShareOptions {
  url: string;
}

export interface ISLineResult {
  share: number;
}

export default /* #__PURE__ */ (Vue as VueConstructor<Vue & InstanceType<TBaseCountMixin<ISLineCountShareOptions>>>).extend({
  name: 'SLineCount',

  mixins: [BaseCount<ISLineCountShareOptions>()],

  methods: {
    handlePinterestResponse(data: ISLineResult): void {
      this.handleResult<ISLineResult>(data);

      this.saveCount(data?.share);
    },
  },

  mounted() {
    const { shareOptions } = this;
    const { url } = shareOptions;
    const BASE_URL = 'https://api.line.me/social-plugin/metrics';

    const finalURL = `${BASE_URL}${getSerialisedParams({
      url,
    })}`;

    HTTP<ISLineResult>(finalURL, (_err, data) => {
      if (data) {
        this.handlePinterestResponse(data);
      }
    });
  },
});