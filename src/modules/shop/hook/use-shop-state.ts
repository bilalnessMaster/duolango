import { parseAsBoolean, useQueryStates } from 'nuqs';



export const useShopState = () => {

  return useQueryStates({
    success: parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true
    })
  })

}
