import {
  Reducer,
  combineReducers
} from 'redux';
import {ChatReducer} from '../chat/chat-reducer';
import {IMessage} from '../chat/message.model';

export interface AppState {
  chat: IMessage;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  chat: ChatReducer
});

export default rootReducer;
