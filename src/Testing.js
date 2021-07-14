import React from 'react';
import styled from 'styled-components';

const Testing = () => {
    return (
        <Wrapper>
            <h3>Hello World!</h3>
            <p>some text... some text</p>
            <div className='article'>
                <p>this is an article</p>
            </div>
            <button>Click Me!</button>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    h3 {
        color: red;
    }
    .article {
        p {
            color: green;
        }
    }
    p {
        color: blue;
    }
`;

export default Testing;