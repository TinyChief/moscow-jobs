import {
  Avatar,
  Box,
  Grid,
  Hidden,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { H2, H4, Paragraph } from "../components/Typography";
import { blue, grey } from "@mui/material/colors";
import ApplicationStatusChip from "./ApplicationStatusChip";

const CommonDepartmentApplication = ({
  organization,
  application,
  hideApplicationStatus,
  children,
}) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        minHeight={"80vh"}
        sx={{
          "> *:not(:last-child)": {
            marginBottom: 3,
          },
        }}
      >
        <Box>
          <Grid container spacing={3}>
            <Grid item>
              {/* <Avatar
                sx={{ width: "120px", height: "120px", bgcolor: blue[300] }}
              /> */}
              <Box
                sx={{
                  width: "120px",
                  height: "120px",
                  marginX: "auto",
                }}
                component={"img"}
                src={'/assets/images/organizations/sport.svg'}
              />
            </Grid>
            <Grid item>
              <Box display={"inline"} width={"300px"}>
                <OrganizationInfoItem
                  icon={"corporate_fare"}
                  value={organization.name}
                />
                <OrganizationInfoItem
                  icon={"description"}
                  value={organization.description}
                />
                <OrganizationInfoItem
                  icon={"location_on"}
                  value={organization.address}
                />
                <OrganizationInfoItem
                  icon={"mail"}
                  value={organization.email}
                />
                <OrganizationInfoItem
                  icon={"call"}
                  value={organization.phone}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <H2 sx={{ marginRight: 2 }}> {application.name} </H2>

          {hideApplicationStatus ? (
            ""
          ) : (
            <ApplicationStatusChip status={application.status} />
          )}
        </Box>
        <H4>Описание</H4>
        <Paragraph
          sx={{
            flex: "1",
            width: "100%",
            whiteSpace: "pre-wrap",
          }}
        >
          {application.description}
        </Paragraph>
        <H4>Тестовое задание</H4>
        <Paragraph
          sx={{
            flex: "1",
            width: "100%",
            whiteSpace: "pre-wrap",
          }}
        >
          {application.test}
        </Paragraph>
        <Box
          display={"flex"}
          width="100%"
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

const OrganizationInfoItem = ({ icon, value }) => {
  return (
    <ListItemButton
      disableRipple
      sx={{ py: 0, minHeight: 32, paddingLeft: "8px", width: "300px" }}
    >
      <ListItemIcon sx={{ color: grey[600] }}>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText
        primary={value}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: "medium",
          textOverflow: "ellipsis",
          noWrap: true,
        }}
      />
    </ListItemButton>
  );
};

export default CommonDepartmentApplication;
