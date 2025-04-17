export interface ErrorResponse {
  status: number;
  statusText: string;
}

export interface ArticleProps {
  slug: string
  title: string
  body: string
  description: string
  favorited: boolean
  favoritesCount: number
  tagList: string[]
  author: {
    username: string
    image: string
  }
  createdAt: string
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export interface UserFormData {
  username: string
  email: string
  password: string
  avatarUrl: string | null
}



