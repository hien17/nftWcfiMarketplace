import { Box, Button, Text, Grid, GridItem, Select } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Information() {
    const [optionTime, setOptionTime] = useState("24h")

    return (
        <Box backgroundColor={"black"} color={'white'} border={"1px solid rgba(121,129,151,0.4)"} borderRadius={10} p={6}>
            <Box display={"flex"}>
                <Button mr={3} p={0} variant={"unstyled"} onClick={() => setOptionTime("24h")}><Text fontWeight={"bold"}
                    color={optionTime === "24h" ? "" : "#7D8DA7"}
                    className={optionTime === "24h" ? "bg-gradient-to-r from-teal-200 via-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text underline" : ""}
                >Last 24h</Text></Button>
                <Button mr={3} p={0} variant={"unstyled"} onClick={() => setOptionTime("3D")}><Text fontWeight={"bold"}
                    color={optionTime === "3D" ? "" : "#7D8DA7"}
                    className={optionTime === "3D" ? "bg-gradient-to-r from-teal-200 via-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text underline" : ""}
                > 3D</Text></Button>
                <Button mr={3} p={0} variant={"unstyled"} onClick={() => setOptionTime("7D")}><Text fontWeight={"bold"}
                    color={optionTime === "7D" ? "" : "#7D8DA7"}
                    className={optionTime === "7D" ? "bg-gradient-to-r from-teal-200 via-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text underline" : ""}
                > 7D</Text></Button>
                <Button mr={3} p={0} variant={"unstyled"} onClick={() => setOptionTime("1M")}><Text fontWeight={"bold"}
                    color={optionTime === "1M" ? "" : "#7D8DA7"}
                    className={optionTime === "1M" ? "bg-gradient-to-r from-teal-200 via-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text underline" : ""}
                > 1M</Text></Button>
            </Box>
            <Box >
                <Grid templateColumns='repeat(3, 1fr)'
                    gap={6}>
                    <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1, xl: 1, "2xl": 1 }} bg='#0E1114' borderRadius={10}>
                        <Text pt={3} backgroundColor={"black"} color={'white'} fontWeight={"hairline"} fontSize={13}>Total Listed</Text>
                        <Text backgroundColor={"black"} color={'white'} fontWeight={"bold"} fontSize={24}>1,028</Text>
                    </GridItem>
                    <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1, xl: 1, "2xl": 1 }} bg='#0E1114' borderRadius={10}>
                        <Text pt={3} backgroundColor={"black"} color={'white'} fontWeight={"hairline"} fontSize={13}>Total Volume (BNB)</Text>
                        <Text backgroundColor={"black"} color={'white'} fontWeight={"bold"} fontSize={24}>6,234,000.00</Text>
                    </GridItem>
                    <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1, xl: 1, "2xl": 1 }} bg='#0E1114' borderRadius={10}>
                        <Text pt={3} backgroundColor={"black"} color={'white'} fontWeight={"hairline"} fontSize={13}>Total Sold</Text>
                        <Text backgroundColor={"black"} color={'white'} fontWeight={"bold"} fontSize={24}>748</Text>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}