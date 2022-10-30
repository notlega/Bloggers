import supabase from './supabase';

const databaseName =  'blogs';

const create = (title, description, owner) => {
    return supabase.from(databaseName).insert({title, description, owner}).single();
}
const read = (id) => {
    return supabase.from(databaseName).select('*').eq('id', id);
}
const update = (id, title, description) => {
    return supabase.from(databaseName).update({title, description}).eq('id', id);
}
const remove = (id) => {
    return supabase.from(databaseName).delete().eq('id', id);
}


export {
    create,
    read,
    update,
    remove,
}
