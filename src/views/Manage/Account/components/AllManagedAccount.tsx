import React, { useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import SearchBox from "../../components/SearchBox";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import CreateAccount from "./CreateAccount";

interface AllManagedAccountProps {
    onClose: () => void;
}

const AllManagedAccount: React.FC<AllManagedAccountProps> = (props) => {
    const { onClose } = props;
    const [openAccount, setOpenAccount] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    })

    const handleOpenAddAccount = () => {
        setOpenAccount({ type: 'add', open: true });
    }
    const handleCloseAddAccount = () => {
        setOpenAccount({ type: 'add', open: false})
    }
    return(
        <Box>
            {!openAccount.open && (
                <>
                    <SearchBox
                        initialValue=""
                        onSearch={() => {}}
                        placeholder="Tìm kiếm theo tên,..."
                    >
                        <Button
                            variant="outlined"
                            startIcon={<Add/>}
                            sx={{
                                border: `1px solid ${COLORS.BUTTON}`,
                                color: COLORS.BUTTON
                            }}
                            onClick={handleOpenAddAccount}
                        >
                            Tạo tài khoản
                        </Button>
                    </SearchBox>
                    <NavigateBack
                        title="Quản lý tài khoản"
                        onBack={onClose}
                    />
                </>
            )}
            {openAccount.open && openAccount.type === 'add' && (
                <>
                    <CreateAccount
                        onClose={handleCloseAddAccount}
                    />
                </>
            )}
        </Box>
    )
}

export default AllManagedAccount;