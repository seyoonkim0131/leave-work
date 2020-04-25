import gql from 'graphql-tag';

export const GET_MY_PROFILE = gql`
    query GetMyProfile {
        GetMyProfile {
            ok
            error
            user {
                id
                email
                name
                startH
                startM
                endH
                endM
                salary
            }
        }
    }
`;