export interface ITwit {
  id: string;
  owner_id?: string;
  twit: string;
}
export interface ILikeTwit {
  twit_id: string;
  user_id: string;
}
export interface ICommentTwit extends ILikeTwit {
  comment: string;
}
