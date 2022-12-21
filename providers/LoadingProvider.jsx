import { useContext, createContext, useState } from 'react';
import { Flex } from '@chakra-ui/react';

const LoadingContext = createContext();
const useLoadingContext = function () {
  return useContext(LoadingContext);
};

const LoadingProvider = function ({ children }) {
  const [is_loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading, isLoading: is_loading }}>
      {is_loading && (
        <Flex
          pos="fixed"
          left="0"
          right="0"
          zIndex="9999"
          top="0"
          bottom="0"
          bg="rgba(0,0,0,0.6)"
        >
          <svg
            id="classicCircle"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="100 0 428.4 80"
            style={{
              enableBackground: 'new 0 0 428.4 129.1',
            }}
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  className="st0 leaf-2"
                  d="M295.4,31.8c-0.1-0.8-0.1-1.5-0.1-2.3c-0.1-3.4,0.4-6.7,1.5-9.9c-5.1-4.4-10.2-10.9-12.8-14.6
										  c-1.3,5-3.3,15.2-0.7,22.9C287.5,28.6,291.6,29.9,295.4,31.8z"
                />
                <path
                  className="st0 leaf-3"
                  d="M298.4,29.5v0.1c-0.1,1.6,0.2,3.2,0.7,4.7c2.6,2,4.6,4.7,5.8,7.8l0,0c4.6-5.3,5.9-6.7,8-11l1.4-2.9l1.4,2.9
										  c2.1,4.3,3.3,5.8,8,11l0,0c1.2-3.1,3.2-5.8,5.8-7.8c0.6-1.5,0.8-3.1,0.7-4.7v-0.1v-0.1c0.2-6.1-1.9-12-5.9-16.7
										  c-3.7-4-7-8.2-10-12.7c-3,4.5-6.4,8.8-10,12.7C300.3,17.4,298.2,23.3,298.4,29.5L298.4,29.5z"
                />
                <path
                  className="st0 leaf-4"
                  d="M333.1,29.6c0,0.8,0,1.5-0.1,2.3c3.8-1.9,7.9-3.2,12.1-3.8c2.6-7.7,0.6-18-0.7-22.9
										  c-2.6,3.6-7.7,10.2-12.8,14.6C332.8,22.8,333.3,26.2,333.1,29.6z"
                />
                <path
                  className="st0 leaf-1"
                  d="M302.5,44.6c-3.5-13.4-23.9-14.1-24.1-14.1h-0.2c-5.3-0.7-9.7-4.8-12.1-7.7c-0.3,3.1-0.3,8.5,2.3,16.1
										  c0.1,0.2,6.4,18.3,26.8,23.5c0.1-2.6,0.5-5.1,1.3-7.6c1.1-3.5,2.9-6.7,5.3-9.5C302.1,45.1,302.3,44.9,302.5,44.6z"
                />
                <path
                  className="st0 leaf-6"
                  d="M324.2,47.4c-1.1-1.3-2.1-2.4-3-3.4c-3.6-4.1-5.4-6.1-7-9c-1.7,3-3.4,4.9-7.1,9l-3,3.4
										  c-2.1,2.4-3.7,5.3-4.7,8.4c-0.8,2.4-1.1,4.9-1.2,7.4c5.2,1.7,10.6,2.6,16,2.6c5.4,0,10.7-0.9,15.8-2.6c0-2.5-0.4-5-1.1-7.4
										  C328,52.7,326.4,49.8,324.2,47.4z"
                />
                <path
                  className="st0 leaf-5"
                  d="M350.2,30.6H350c-0.2,0-20.6,0.6-24.1,14.1c0.2,0.2,0.4,0.5,0.6,0.7c2.4,2.7,4.2,6,5.3,9.5
										  c0.8,2.5,1.2,5,1.3,7.6c20.4-5.1,26.8-23.2,26.9-23.4c2.6-7.6,2.6-13,2.3-16.1C359.9,25.7,355.5,29.9,350.2,30.6z"
                />
              </g>
            </g>
          </svg>
        </Flex>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext, useLoadingContext };
