/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { getGenderName, getJobStatusName } from "../utils/utils";
import { Box } from "@mui/material";

const UserInfoItem = ({ title, value }) => {
  return (
    <Box display={"flex"} mb={1}>
      <Box component={"span"} textAlign={"end"} width={"48%"}>
        {title}:
      </Box>
      <Box component={"span"} textAlign={"start"} marginLeft={"20px"}>
        {value}
      </Box>
    </Box>
  );
};

const UserInfoSectionTitle = ({ title }) => {
  return (
    <Box component={"h3"} mb={2}>
      {title}
    </Box>
  );
};

function CandidateApplicationInfo({ user, userInfo }) {
  return (
    <>
      <UserInfoSectionTitle title={"Основная информация"} />
      <UserInfoItem title={"Имя"} value={user.name} />
      <UserInfoItem title={"Фамилия"} value={user.surname} />
      <UserInfoItem title={"Отчество"} value={user.secondname} />
      <UserInfoItem
        title={"Пол"}
        value={userInfo.gender ? getGenderName(userInfo.gender) : ""}
      />
      <UserInfoItem
        title={"Дата рождения"}
        value={
          userInfo.birthday
            ? dayjs(userInfo.birthday).format("DD MMMM YYYY [г.]")
            : ""
        }
      />
      <UserInfoItem title={"Гражданство"} value={userInfo.citizen} />

      <UserInfoItem title={"Город проживания"} value={userInfo.city} />
      <UserInfoItem title={"Район проживания"} value={userInfo.district} />

      <UserInfoItem title={"Образование"} value={userInfo.level} />
      <UserInfoItem title={"Адрес электронной почты"} value={user.email} />
      <UserInfoItem title={"Мобильный телефон"} value={user.phone} />
      <UserInfoSectionTitle title={"Образование"} />
      <UserInfoItem
        title={"Учебное заведение"}
        value={userInfo.universityName}
      />
      <UserInfoItem title={"Город"} value={userInfo.universityCity} />
      <UserInfoItem title={"Факультет"} value={userInfo.faculty} />
      <UserInfoItem title={"Специальность"} value={userInfo.speciality} />
      <UserInfoItem title={"Год окончания"} value={userInfo.universityYear} />
      <UserInfoSectionTitle
        title={
          "Опыт работы (практик, стажировок) или проектной общественной деятельности"
        }
      />
      <UserInfoItem title={"Место работы"} value={userInfo.jobExperience} />
      <UserInfoItem
        title={"Статус"}
        value={userInfo.jobStatus ? getJobStatusName(userInfo.jobStatus) : ""}
      />
      <UserInfoSectionTitle title={"Дополнительная информация"} />
      <UserInfoItem title={"Откуда узнал(a) о стажировке"} value={""} />
      <UserInfoItem
        title={"Профиль в соцсети «ВКонтакте»"}
        value={userInfo.vkId}
      />
      <UserInfoItem title={"Профиль в Telegram"} value={userInfo.telegramId} />
    </>
  );
}

export default CandidateApplicationInfo;
