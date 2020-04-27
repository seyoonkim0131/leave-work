import gql from 'graphql-tag';

export const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        SignIn(email: $email, password: $password) {
            ok
            error
            token
        }
    }
`;

export const UPDATE_MY_PROFILE =gql`
    mutation UpdateMyProfile($selStartH: String, $selStartM: String, $selEndH: String, $selEndM: String, $salary: String) {
        UpdateMyProfile(startH: $selStartH, startM: $selStartM, endH: $selEndH, endM: $selEndM, salary: $salary) {
            ok
            error
        }
    }
`;