import React, { useEffect, useState } from 'react';
import { Button, Heading, TextWrapper } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import {
	PricingSection,
	PricingWrapper,
	PricingContainer,
	PricingCardInfo,
	PricingCardPlan,
	PricingCardCost,
	PricingCardFeatures,
	PricingCardText,
	PricingCardFeature,
	PricingCard,
} from './PricingStyles';
import { pricingData } from '../../data/PricingData';

function Pricing() {

	const [data, setData] = useState("")

	useEffect(() => {
    const items = JSON.parse(localStorage.getItem("dataKey"));
    if (items) {
      setData(items);
    }
  },[]);

  console.log(data?.response?.map((d) => d?.firstname))

	return (
    <IconContext.Provider value={{ color: "#a9b3c1", size: "1rem" }}>
      <PricingSection id="pricing">
        <PricingWrapper>
          {/* {data.map((d) => ( */}
          <Heading>
            {" "}
            {data?.response?.map((d) => d?.firstname)} Pick Your Best Option
          </Heading>
          {/* )  */}
          {/* )}  */}

          <TextWrapper
            mb="1.4rem"
            weight="600"
            size="1.1rem"
            color="white"
            align="center"
          >
            Create, maintain and store your data with Clevertag.
          </TextWrapper>
          <PricingContainer>
            {pricingData.map((card, index) => (
              <PricingCard key={index}>
                <PricingCardInfo>
                  <PricingCardPlan>{card.title}</PricingCardPlan>
                  <PricingCardCost>{card.price}</PricingCardCost>
                  <PricingCardText>{card.description}</PricingCardText>
                  <PricingCardFeatures>
                    {card.features.map((feature, index) => (
                      <PricingCardFeature key={index}>
                        {feature}
                      </PricingCardFeature>
                    ))}
                  </PricingCardFeatures>
                  <Button>Get Started</Button>
                </PricingCardInfo>
              </PricingCard>
            ))}
          </PricingContainer>
        </PricingWrapper>
      </PricingSection>
    </IconContext.Provider>
  );
}
export default Pricing;
