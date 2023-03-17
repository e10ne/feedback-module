import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  active_feedbacks?: Maybe<Scalars['Boolean']>;
  feedbacks?: Maybe<Array<Maybe<Feedback>>>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type Feedback = {
  __typename?: 'Feedback';
  archived?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Category>;
  category_id?: Maybe<Scalars['Int']>;
  create_date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Set feedback as archived */
  archiveFeedback?: Maybe<Scalars['Boolean']>;
  /** Create a new category */
  createCategory?: Maybe<Category>;
  /** Create feedback */
  createFeedback?: Maybe<Feedback>;
  /** Delete an category */
  deleteCategory?: Maybe<Scalars['Boolean']>;
  /** Change the category title */
  updateCategory?: Maybe<Category>;
};


export type MutationArchiveFeedbackArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCategoryArgs = {
  title: Scalars['String'];
};


export type MutationCreateFeedbackArgs = {
  category_id: Scalars['Int'];
  description: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  hasActive: Scalars['Boolean'];
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Gets all categories */
  categories?: Maybe<Array<Maybe<Category>>>;
  /** Get a specific feedback */
  feedback?: Maybe<Feedback>;
  /** Returns all feedbacks that are not archived */
  feedbacks?: Maybe<Array<Maybe<Feedback>>>;
  /** Gets the 5 most recent created feedbacks that are archived */
  initialArchived?: Maybe<Array<Maybe<Feedback>>>;
};


export type QueryFeedbackArgs = {
  id: Scalars['Int'];
};

export type ArchiveFeedbackMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ArchiveFeedbackMutation = { __typename?: 'Mutation', archiveFeedback?: boolean | null };

export type CreateCategoryMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: { __typename?: 'Category', id: number, title?: string | null } | null };

export type CreateFeedbackMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  categoryId: Scalars['Int'];
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback?: { __typename?: 'Feedback', id: number, title?: string | null, description?: string | null, create_date?: any | null, category_id?: number | null, category?: { __typename?: 'Category', id: number, title?: string | null } | null } | null };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['Int'];
  hasActive: Scalars['Boolean'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: boolean | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'Category', id: number, title?: string | null } | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: number, title?: string | null } | null> | null };

export type FeedbacksQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedbacksQuery = { __typename?: 'Query', feedbacks?: Array<{ __typename?: 'Feedback', id: number, title?: string | null, description?: string | null, create_date?: any | null, archived?: boolean | null, category?: { __typename?: 'Category', id: number, title?: string | null } | null } | null> | null };

export type InitialArchivedQueryVariables = Exact<{ [key: string]: never; }>;


export type InitialArchivedQuery = { __typename?: 'Query', initialArchived?: Array<{ __typename?: 'Feedback', id: number, title?: string | null, description?: string | null, create_date?: any | null, category?: { __typename?: 'Category', id: number, title?: string | null } | null } | null> | null };


export const ArchiveFeedbackDocument = gql`
    mutation ArchiveFeedback($id: Int!) {
  archiveFeedback(id: $id)
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
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    title
  }
}
    `;

export function useCategoriesQuery(options?: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<CategoriesQuery, CategoriesQueryVariables>({ query: CategoriesDocument, ...options });
};
export const FeedbacksDocument = gql`
    query feedbacks {
  feedbacks {
    id
    title
    description
    create_date
    archived
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
export const InitialArchivedDocument = gql`
    query InitialArchived {
  initialArchived {
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

export function useInitialArchivedQuery(options?: Omit<Urql.UseQueryArgs<InitialArchivedQueryVariables>, 'query'>) {
  return Urql.useQuery<InitialArchivedQuery, InitialArchivedQueryVariables>({ query: InitialArchivedDocument, ...options });
};