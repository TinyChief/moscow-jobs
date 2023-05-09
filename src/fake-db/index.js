import Mock from './mock';

import './db/auth';
import './db/notification';
import './db/job'

Mock.onAny().passThrough();
