import { createClient } from '@supabase/supabase-js';

const URL = 'https://thdokqdjfkuqtkuxyyke.supabase.co'
const API_KEY = 'sb_publishable_OmSSEc3S2g-xkhkeWRNk6A_93SxBVsO'

export const supabase = createClient(URL, API_KEY);