import styled from "@emotion/styled";
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg";
import { PrimaryButton, Text } from "components";
import { useState } from "react";
import { COLORS, capitalizeFirstLetter, rewardProgramTypes } from "utils";
import { useGenericRewardClaimCard } from "../hooks/useGenericRewardClaimCard";
import { ClaimRewardsModal } from "./ClaimRewardsModal";
import GenericCard from "./GenericCard";
import { Tooltip } from "components/Tooltip";

type GenericRewardClaimCardProps = {
  program: rewardProgramTypes;
  children?: React.ReactNode;
};

const GenericRewardClaimCard = ({
  program,
  children,
}: GenericRewardClaimCardProps) => {
  const {
    primaryColor,
    token,
    rewardsAmount,
    unclaimedAmount,
    rewardTokenSymbol,
    formatUnits,
    isConnected,
    programName,
  } = useGenericRewardClaimCard(program);
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <ClaimRewardsModal
        program={program}
        isOpen={isModalOpen}
        onExit={() => setModalOpen(false)}
      />
      <GenericCard program={program} displayBranding>
        <Header>
          <LogoContainer primaryColor={primaryColor}>
            <Logo src={token.logoURI} alt={token.symbol} />
          </LogoContainer>
          <TextStack>
            <Text color="white" size="2xl">
              {formatUnits(rewardsAmount)} {rewardTokenSymbol}
            </Text>
            {unclaimedAmount && (
              <ClaimableIconTextStack>
                <Tooltip
                  body={`New ${programName.toLowerCase()} rewards are claimable 2 weeks after the first day of every month`}
                  title={`${capitalizeFirstLetter(
                    programName.toLowerCase()
                  )} claiming`}
                  icon="clock"
                  placement="bottom-start"
                >
                  <ClockIcon />
                </Tooltip>
                <Text color="grey-400" size="md">
                  {formatUnits(unclaimedAmount)} {rewardTokenSymbol} claimable
                </Text>
              </ClaimableIconTextStack>
            )}
          </TextStack>

          {isConnected && (
            <StyledHandlerButton
              onClick={() => setModalOpen(true)}
              primaryColor={primaryColor}
              disabled={!unclaimedAmount || unclaimedAmount.lte(0)}
            >
              <Text color="white" size="md" weight={500}>
                Claim
              </Text>
            </StyledHandlerButton>
          )}
        </Header>
        {children}
      </GenericCard>
    </>
  );
};

export default GenericRewardClaimCard;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  gap: 16px;
`;

const Logo = styled.img`
  height: 24px;
  width: 24px;
`;

const LogoContainer = styled.div<{ primaryColor: string }>`
  // Layout
  display: flex;
  padding: 8px;
  align-items: flex-start;
  // Colors
  border-radius: 32px;
  border: 1px solid ${COLORS["grey-400-15"]};
  background: ${({ primaryColor }) =>
    COLORS[`${primaryColor}-5` as keyof typeof COLORS]};
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08),
    0px 2px 6px 0px rgba(0, 0, 0, 0.08);
`;

const TextStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

const StyledHandlerButton = styled(PrimaryButton)<{ primaryColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  height: 40px;
  padding: 0px 20px;

  background: ${COLORS["black-700"]};

  border-radius: 32px;
  border: 1px solid
    ${({ primaryColor }) => COLORS[`${primaryColor}-15` as keyof typeof COLORS]};

  cursor: pointer;
`;

const ClaimableIconTextStack = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 4px;
`;
