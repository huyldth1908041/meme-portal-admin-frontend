import React from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  > div.ant-select-selector {
    border: 1px solid #111;
    border-radius: 7px !important;
    outline: none;
    height: 40px !important;
    min-width: 200px !important;
    padding: 5px 20px !important;
    font-weight: 600;
  }

  margin: 0 10px;
`;

const SearchAndSelect = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <StyledSelect
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      showSearch={true}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
      options={options}
    />
  );
};

export default SearchAndSelect;