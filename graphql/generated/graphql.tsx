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
};

export type Category = {
  __typename?: 'Category';
  feedbacks?: Maybe<Array<Maybe<Feedback>>>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type Feedback = {
  __typename?: 'Feedback';
  archived?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Category>;
  category_id: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new category */
  createCategory?: Maybe<Category>;
  /** Create feedback */
  createFeedback?: Maybe<Feedback>;
  /** Delete an category */
  deleteCategory?: Maybe<Category>;
  /** Change the category title */
  updateCategory?: Maybe<Category>;
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
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Gets all categories */
  allCategories?: Maybe<Array<Maybe<Category>>>;
  /** Get a specific feedback */
  feedback?: Maybe<Feedback>;
};


export type QueryFeedbackArgs = {
  id: Scalars['Int'];
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', allCategories?: Array<{ __typename?: 'Category', id: number, title?: string | null } | null> | null };


export const CategoriesDocument = gql`
    query Categories {
  allCategories {
    id
    title
  }
}
    `;

export function useCategoriesQuery(options?: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<CategoriesQuery, CategoriesQueryVariables>({ query: CategoriesDocument, ...options });
};