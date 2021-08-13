import { BD } from './bd/bd';
import { User} from './shared/user/user';

export abstract class SystemManager  {
	protected static dataBase: BD;
}
