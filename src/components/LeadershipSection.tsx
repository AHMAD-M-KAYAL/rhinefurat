import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useTranslation } from "react-i18next";
import { leadershipMembers } from "../data/team";
import Reveal from "./Reveal";
import { useState } from "react";

type LeadershipSectionProps = {
  isRTL: boolean;
};

const LeadershipSection = ({ isRTL }: LeadershipSectionProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const itemsPerPage = 2;
  const total = leadershipMembers.length;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  const handlePrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const handleNext = () => setPage((p) => (p + 1) % totalPages);

  const start = page * itemsPerPage;
  const visibleMembers = leadershipMembers.slice(start, start + itemsPerPage);

  return (
    <Box component="section" className="section-spacing">
      <div className="container">
        <Reveal>
          <Typography variant="h2" gutterBottom>
            {t("team.leadershipHeading")}
          </Typography>
        </Reveal>
        <Reveal delayMs={100}>
          <Typography variant="body1" sx={{ maxWidth: 640, mb: 4 }}>
            {t("team.leadershipDescription")}
          </Typography>
        </Reveal>
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
          <IconButton aria-label="Previous" onClick={handlePrev} disabled={totalPages <= 1}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton aria-label="Next" onClick={handleNext} disabled={totalPages <= 1}>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
        <div className="row g-4">
          {visibleMembers.map((leader) => {
            const memberKey = leader.translationKey;
            const role = t(`${memberKey}.role`);
            const focus = t(`${memberKey}.focus`);
            const avatarImageStyles =
              leader.photo &&
              ["angie", "rony", "osama-karazi"].includes(leader.id)
                ? {
                    ...(leader.id === "osama-karazi"
                      ? { transform: "scale(1.2)" }
                      : {}),
                    ...(leader.id === "angie" || leader.id === "rony"
                      ? { objectPosition: "center top" }
                      : {}),
                  }
                : undefined;

            return (
              <div className="col-md-6" key={leader.translationKey}>
                <Reveal>
                  <Card sx={{ height: "100%" }} className="h-100 shadow-sm">
                    <CardContent>
                    <Stack
                      direction={isRTL ? "row-reverse" : "row"}
                      spacing={3}
                      alignItems="center"
                      sx={{ mb: 3 }}
                    >
                      <Avatar
                        src={leader.photo}
                        alt={leader.name}
                        sx={{
                          bgcolor: "secondary.main",
                          width: 64,
                          height: 64,
                          ...(avatarImageStyles
                            ? { "& img": avatarImageStyles }
                            : {}),
                        }}
                      >
                        {!leader.photo &&
                          leader.name
                            .split(" ")
                            .map((s) => s[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                      </Avatar>
                      <Box sx={{ textAlign: isRTL ? "right" : "left" }}>
                        <Typography variant="h6">{leader.name}</Typography>
                        <Chip
                          icon={<PeopleAltIcon />}
                          label={role}
                          color="secondary"
                          variant="outlined"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Stack>
                    <Typography variant="body1" sx={{ mb: 0 }}>
                      {focus}
                    </Typography>
                    </CardContent>
                  </Card>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
};

export default LeadershipSection;
