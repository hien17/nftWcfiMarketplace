import { gql, useQuery } from "@apollo/client";



class MoviesAPI extends RESTDataSource {
    baseURL = 'https://movies-api.example.com/';
  
    constructor(options) {
      super(options); // this sends our server's `cache` through
      this.token = options.token;
    }
  
    
    requestDeduplicationPolicyFor(url, request) {
      const cacheKey = this.cacheKeyFor(url, request);
      return {
        policy: 'deduplicate-until-invalidated',
        deduplicationKey: `${request.method ?? 'GET'} ${cacheKey}`,
      };
    }
    
  
    // Duplicate requests are cached indefinitely
    async getMovie(id) {
      return this.get(`movies/${encodeURIComponent(id)}`);
    }
  }

export const getAll = gql`
  query {
    tokens(orderBy: tokenId) {
      id
      approved
      tokenId
      owner
    }
  }
`;
