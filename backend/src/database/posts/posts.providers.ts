import { Connection } from 'mongoose';

import { PostSchema } from './posts.schema';
import Config from '../../../config/config';

export const postsProviders = [
    {
        provide: Config.POST_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('Post', PostSchema),
        inject: [Config.DB_PROVIDER],
    },
];