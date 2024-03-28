import { I18nManager } from "react-native";
import labels from "./strings.json";
const Langs = {
  t: (key, ...operator) => {
    let label =
      labels[key] != null ? labels[key][I18nManager.isRTL ? "ar" : "en"] : key;
    for (let i = 0; i < operator.length; ++i)
      label = label.replace("%" + i, operator[i]);

    return label;
  }
};
export default Langs;
