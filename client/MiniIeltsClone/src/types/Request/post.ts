export interface CreatePostDto {
  content: string;
  title: string;
  image?: string;
}

export interface UpdatePostDto extends CreatePostDto {}
