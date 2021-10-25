import memoize from 'lodash/memoize'; // Use for caching/memoize for better performance
import i18n from 'i18n-js';

// import * as Localization from 'expo-localization';
import {I18nManager} from 'react-native';

import _ from 'lodash';

import {zh, en, es} from './supportedLanguages';

// const en = () => require('./en.json');
// const es = () => require('./es.json');
// const zh = () => require('./zh.json');

export const IMLocalized = (text) => localize(_.startCase(_.toLower(text)));

const localize = memoize(
  (key, config) =>
    i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const init = () => {
  i18n.fallbacks = true;
  i18n.translations = {en, zh, es};
  i18n.locale = 'es';
};
