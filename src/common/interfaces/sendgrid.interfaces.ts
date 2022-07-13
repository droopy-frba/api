export interface IEmail {
  to: string[];
  from: {
    email: string;
    name: string;
  };
  subject: string;
  text: string;
  html: string;
}
