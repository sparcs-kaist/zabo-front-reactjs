import styled from 'styled-components';

export const Page = styled.section`
    width: 100%;
    height: 100%;
`;

Page.Header = styled.div`
    background-color: #f8f8f8;
    width: 100%;
    height: 55px;
`;

Page.Body = styled.div`
    background-color: ${props => props.theme.gray30};
`;

Page.Title = styled.div`
    background-color: #ffffff;
`;

Page.Title.Text = styled.div`
    font-size: 200px;
    font-weight: bold;
    color: ${props => props.theme.main};
    opacity: 0.5;
`;

Page.Title.Image = styled.img`
  width: auto;
  height: 100%;
`;

Page.Description = styled.p`
    font-size: 16px;
`;

export default Page;
