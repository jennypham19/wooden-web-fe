import Page from "@/components/Page"
import { useState } from "react";
import SearchBox from "../components/SearchBox";
import { Button } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { Add } from "@mui/icons-material";
import CreateMachine from "./components/CreateMachine";

const Machines = () => {
    const [openMachine, setOpenMachine] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    });

    const handleOpenAddMachine = () => {
        setOpenMachine({ open: true, type: 'add' })
    }

    const handleCloseAddMachine = () => {
        setOpenMachine({ open: false, type: 'add' })
    }
    return (
        <Page title="Quản lý máy móc">
            {!openMachine.open && (
                <>
                    <SearchBox
                        initialValue=""
                        onSearch={() => {}}
                        placeholder="Tìm kiếm theo tên, mã, thông số, thương hiệu..."
                    >
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            startIcon={<Add/>}
                            onClick={handleOpenAddMachine}
                        >
                            Tạo máy móc
                        </Button>
                    </SearchBox>
                </>
            )}
            {openMachine.open && openMachine.type === 'add' && (
                <CreateMachine
                    onBack={handleCloseAddMachine}
                />
            )}
        </Page>
    )
}
export default Machines;