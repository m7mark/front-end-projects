import styled from '@emotion/styled';

const BottomTextContainer = styled.div`
  font-size: 18px;
  font-weight: 300;
  position: relative;
  left: -80px;
  margin-bottom: 20px;
`
const CountText = styled.p`
  margin: 0;
  padding-right: 10px;
  position: absolute;
  width: 150px;
`
const BestText = styled.p`
  margin: 0;
  position: absolute;
  left: 100px;
  width: 150px;
`
type Props = {
  counts: number
  best: string
}

export const Counter: React.FC<Props> = ({ counts, best }) => {
  return (
    <>
      <BottomTextContainer>
        <CountText>Counts: {counts}</CountText>
        <BestText>Best: {best}</BestText>
      </BottomTextContainer>
    </>
  )
}