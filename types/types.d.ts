export interface LoginDefaultFormValue {
  email: string;
  password: string;
  visible: boolean;
}

export interface YupErrorMessages {
  [key: string]: string;
}

export interface ArticleBody {
  title: string;
  text: string;
  author: string;
  date: string;
  subject: string;
}

export interface Article extends ArticleBody {
  url: string;
}
