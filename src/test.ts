import { supabase } from "./config/supabaseClient";

(async () => {
  const { data, error } = await supabase
    .from('items')
    .select('*'); 

  console.log({ data, error });
})();
