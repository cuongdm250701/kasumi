import { ItemBusinessSetting } from '@src/constants/interface';

export const isDuplicateBusinessSetting = (
  listBusinessSetting: ItemBusinessSetting[],
) => {
  let result = true;
  for (let i = 0; i < listBusinessSetting.length; i++) {
    if (result) {
      for (let j = 0; j < listBusinessSetting.length; j++) {
        if (i !== j) {
          const isDuplicate =
            listBusinessSetting[i] === listBusinessSetting[j] ? false : true;
          result = isDuplicate;
          break;
        }
      }
    }
  }
};
