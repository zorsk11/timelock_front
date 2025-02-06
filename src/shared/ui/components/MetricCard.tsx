import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

interface MetricCardProps {
  label: string;
  value: number | string;
  change: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change }) => {
  const isPositive = change >= 0;

  return (
    <Flex justify="space-between" flexDir="column">
      <Text mb="16px" textStyle="callout" textColor="grey5Light">
        {label}
      </Text>
      <Box>
        <Text textStyle="title1">{value}</Text>
        <Flex borderRadius="8px" bg="fillSecondaryLight" px="2" py="1">
          <Text
            color={isPositive ? "green.500" : "red.500"}
            textStyle="subheadline"
            display="flex"
            alignItems="center"
          >
            {Math.abs(change)}{" "}
            {/* {isPositive ? (
              <FaArrowUp style={{ width: "16px", height: "16px" }} />
            ) : (
              <FaArrowDown style={{ width: "16px", height: "16px" }} />
            )} */}
          </Text>
          <Text ml="4px" textStyle="subheadline" textColor="grey5Light">
            на этой неделе
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MetricCard;
