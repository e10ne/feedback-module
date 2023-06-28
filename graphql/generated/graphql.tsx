import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  active_feedbacks?: Maybe<Scalars['Boolean']['output']>;
  feedbacks?: Maybe<Array<Maybe<Feedback>>>;
  id: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Feedback = {
  __typename?: 'Feedback';
  archive_date?: Maybe<Scalars['DateTime']['output']>;
  archived?: Maybe<Scalars['Boolean']['output']>;
  category?: Maybe<Category>;
  category_id?: Maybe<Scalars['Int']['output']>;
  create_date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Set feedback as archived */
  archiveFeedback?: Maybe<Feedback>;
  /** Create a new category */
  createCategory?: Maybe<Category>;
  /** Create feedback */
  createFeedback?: Maybe<Feedback>;
  /** Delete an category */
  deleteCategory?: Maybe<Scalars['Boolean']['output']>;
  /** Login */
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  /** Change the category title */
  updateCategory?: Maybe<Category>;
};


export type MutationArchiveFeedbackArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCreateCategoryArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateFeedbackArgs = {
  category_id: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  hasActive: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type PaginatedArchive = {
  __typename?: 'PaginatedArchive';
  feedbacks?: Maybe<Array<Maybe<Feedback>>>;
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  nextCursor?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Gets a list of 5 feedbacks that are archived */
  archivedFeedbacks?: Maybe<PaginatedArchive>;
  /** Gets all categories */
  categories?: Maybe<Array<Maybe<Category>>>;
  /** Get single active feedback by id */
  feedback?: Maybe<Feedback>;
  /** Returns a list of feedbacks that are not archived and are filtered if search parameters are provided */
  feedbacks?: Maybe<Array<Maybe<Feedback>>>;
  me?: Maybe<User>;
};


export type QueryArchivedFeedbacksArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFeedbackArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFeedbacksArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type ArchiveFeedbackMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ArchiveFeedbackMutation = { __typename?: 'Mutation', archiveFeedback?: { __typename?: 'Feedback', id: number, title?: string | null, description?: string | null, archive_date?: any | null, category?: { __typename?: 'Category', id: number, title?: string | null } | null } | null };

export type CreateCategoryMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: { __typename?: 'Category', id: number, title?: string | null } | null };

export type CreateFeedbackMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  categoryId: Scalars['Int']['input'];
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback?: { __typename?: 'Feedback', id: number, title?: string | null, description?: string | null, create_date?: any | null, category_id?: number | null, category?: { __typename?: 'Category', id: number, title?: string | null } | null } | null };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['Int']['input'];
  hasActive: Scalars['Boolean']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: boolean | null };

export type LoginMutationVariables = Exact<{
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: number, username: string } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'Category', id: number, title?: string | null } | null };

export type ArchivedFeedbacksQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ArchivedFeedbacksQuery = { __typename?: 'Query', archivedFeedbacks?: { __typename?: 'PaginatedArchive', hasMore?: boolean | null, nextCursor?: number | null, feedbacks?: Array<{ __typename?: 'Feedback', id: number, title?: string | null, description?: string | null, archive_date?: any | null, category?: { __typename?: 'Category', id: number, title?: string | null } | null } | null> | null } | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: number, title?: string | null, active_feedbacks?: boolean | null } | null> | null };

export type FeedbackQueryVariables = Exact<{
  feedbackId: Scalars['Int']['input'];
}>;


export type FeedbackQuery = { __typename?: 'Query', feedback?: { __typename?: 'Feedback', id: number, title?: string | null, create_date?: any | null, description?: string | null, category?: { __typename?: 'Category', id: number, title?: string | null } | null } | null };

export type FeedbacksQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
}>;


export type FeedbacksQuery = { __typename?: 'Query', feedbacks?: Array<{ __typename?: 'Feedback', id: number, title?: string | null, description?: string | null, create_date?: any | null, category?: { __typename?: 'Category', id: number, title?: string | null } | null } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null };


export const ArchiveFeedbackDocument = gql`
    mutation ArchiveFeedback($id: Int!) {
  archiveFeedback(id: $id) {
    id
    title
    description
    archive_date
    category {
      id
      title
    }
  }
}
    `;

export function useArchiveFeedbackMutation() {
  return Urql.useMutation<ArchiveFeedbackMutation, ArchiveFeedbackMutationVariables>(ArchiveFeedbackDocument);
};
export const CreateCategoryDocument = gql`
    mutation CreateCategory($title: String!) {
  createCategory(title: $title) {
    id
    title
  }
}
    `;

export function useCreateCategoryMutation() {
  return Urql.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument);
};
export const CreateFeedbackDocument = gql`
    mutation CreateFeedback($title: String!, $description: String!, $categoryId: Int!) {
  createFeedback(
    title: $title
    description: $description
    category_id: $categoryId
  ) {
    id
    title
    description
    create_date
    category_id
    category {
      id
      title
    }
  }
}
    `;

export function useCreateFeedbackMutation() {
  return Urql.useMutation<CreateFeedbackMutation, CreateFeedbackMutationVariables>(CreateFeedbackDocument);
};
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryId: Int!, $hasActive: Boolean!) {
  deleteCategory(id: $deleteCategoryId, hasActive: $hasActive)
}
    `;

export function useDeleteCategoryMutation() {
  return Urql.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument);
};
export const LoginDocument = gql`
    mutation Login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    id
    username
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: Int!, $title: String!) {
  updateCategory(id: $id, title: $title) {
    id
    title
  }
}
    `;

export function useUpdateCategoryMutation() {
  return Urql.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument);
};
export const ArchivedFeedbacksDocument = gql`
    query ArchivedFeedbacks($cursor: Int) {
  archivedFeedbacks(cursor: $cursor) {
    feedbacks {
      id
      title
      description
      archive_date
      category {
        id
        title
      }
    }
    hasMore
    nextCursor
  }
}
    `;

export function useArchivedFeedbacksQuery(options?: Omit<Urql.UseQueryArgs<ArchivedFeedbacksQueryVariables>, 'query'>) {
  return Urql.useQuery<ArchivedFeedbacksQuery, ArchivedFeedbacksQueryVariables>({ query: ArchivedFeedbacksDocument, ...options });
};
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    title
    active_feedbacks
  }
}
    `;

export function useCategoriesQuery(options?: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<CategoriesQuery, CategoriesQueryVariables>({ query: CategoriesDocument, ...options });
};
export const FeedbackDocument = gql`
    query Feedback($feedbackId: Int!) {
  feedback(id: $feedbackId) {
    id
    title
    create_date
    description
    category {
      id
      title
    }
  }
}
    `;

export function useFeedbackQuery(options: Omit<Urql.UseQueryArgs<FeedbackQueryVariables>, 'query'>) {
  return Urql.useQuery<FeedbackQuery, FeedbackQueryVariables>({ query: FeedbackDocument, ...options });
};
export const FeedbacksDocument = gql`
    query feedbacks($categoryId: Int, $text: String) {
  feedbacks(categoryId: $categoryId, text: $text) {
    id
    title
    description
    create_date
    category {
      id
      title
    }
  }
}
    `;

export function useFeedbacksQuery(options?: Omit<Urql.UseQueryArgs<FeedbacksQueryVariables>, 'query'>) {
  return Urql.useQuery<FeedbacksQuery, FeedbacksQueryVariables>({ query: FeedbacksDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};