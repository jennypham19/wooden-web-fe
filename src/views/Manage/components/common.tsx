import { Stack, Typography } from "@mui/material"

export const renderAsterisk = (name: string) => (
    <>{name}<span style={{ color: 'red'}}> *</span></>
)

export const renderTextWithAsterisk = (text: string) => (
    <Stack>
        <Typography fontWeight={700} fontSize={{ xs: 14, md: 15 }}>{text}</Typography>
        <Typography fontWeight={700} fontSize={{ xs: 14, md: 15 }} color="error">(*)</Typography>
    </Stack>
)