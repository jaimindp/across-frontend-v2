import styled from "@emotion/styled";

import { ReactComponent as CheckStarRing } from "assets/check-star-ring.svg";
import { ReactComponent as IneligibleWalletRing } from "assets/ineligible-wallet-ring.svg";
import { Text } from "components/Text";

type Props = {
  title: string;
  subTitle: string | React.ReactElement;
  eligible?: boolean;
};

export function WalletHero(props: Props) {
  const icon = props.eligible ? <CheckStarRing /> : <IneligibleWalletRing />;
  return (
    <Container>
      {icon}
      <Title size="3xl" eligible={props.eligible}>
        {props.title}
      </Title>
      <Text size="lg">{props.subTitle}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled(Text)<{ eligible?: boolean }>`
  background: ${({ eligible }) =>
    eligible
      ? "linear-gradient(264.97deg, #6cf9d8 24.16%, #c4fff1 61.61%),#6cf9d8"
      : "#F9D26C"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  margin-top: 32px;
  margin-bottom: 16px;
`;
