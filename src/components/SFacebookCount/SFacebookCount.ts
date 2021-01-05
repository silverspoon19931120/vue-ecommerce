import Vue, { VueConstructor } from 'vue';
import JSONP from '@/utils/jsonp';
import getSerialisedParams from '@/utils/getSerialisedParams';
import { TBaseCountMixin } from '@/mixins/BaseCount/BaseCount';

export interface ISFbCountResult {
  engagement?: {
    reaction_count: number;
    comment_count: number;
    share_count: number;
    comment_plugin_count: number;
  }
  og_object?: {
    description: string;
    id: string;
    title: string;
    type: string;
    updated_time: string;
  }
  app_links?: unknown;
}

export interface ISFbCountError {
  error: {
    message: string;
    type: string;
    is_transient?: boolean;
    code: number;
    fbtrace_id: string;
  }
}

/**
 * @link https://developers.facebook.com/docs/graph-api/reference/v9.0/url
 */
export interface ISFbCountShareOptions {
  url: string;
  accessToken: string;
  fields?: string[];
  scopes?: string[];
}

export default /* #__PURE__ */ (Vue as VueConstructor<Vue & InstanceType<TBaseCountMixin<ISFbCountShareOptions>>>).extend({
  mounted() {
    const BASE_URL = 'https://graph.facebook.com/';
    const { shareOptions } = this;
    const {
      url, accessToken, fields, scopes,
    } = shareOptions;

    const finalURL = `${BASE_URL}${getSerialisedParams({
      access_token: accessToken,
      fields: Array.isArray(fields) ? fields.join(',') : undefined,
      scopes: Array.isArray(scopes) ? scopes.join(',') : undefined,
      url,
    })}`;

    JSONP<ISFbCountResult | ISFbCountError>(finalURL, (_err, data) => {
      if (data && 'engagement' in data) {
        this.saveCount(data.engagement?.share_count);
      }
    });
  },
});
