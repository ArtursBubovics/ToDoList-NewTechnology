import { Box, Button } from "@mui/material"
import CustomTextField from "../../../common/InputFields/CustomTextField"
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import CryptoJS from 'crypto-js';
import { useDispatch } from "react-redux";
import { setUserInfo, setNewPasswordInfo, setCurrentPasswordInfo } from "../../../ReduxToolkit/Reducers/profileData-reducer";
import { useProfileImage } from "../../../common/AccountImage/ProfileImageContext";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

if (!SECRET_KEY) {
    throw new Error('Secret key is not defined in the environment variables3');
}

enum TokenType {
    ACCESS = 'ACCESS',
    REFRESH = 'REFRESH'
}

const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!, $type: TokenType!) {
    verifyToken(token: $token, type: $type) {
      valid
      message
      user {
        UserID
        name
        gmail
      }
    }
  }
`;

const SINGLE_UPLOAD = gql`
    mutation singleUpload($file: Upload!) {
        singleUpload(file: $file)
    }
`

const Profile = () => {
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY as string;
    const initialImageFilePath = '/assets/uploads/'

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [userInfo, setUserInfoState] = useState({ name: '', gmail: '' });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const {imagePath, setImagePath} = useProfileImage();

    const [verifyToken] = useLazyQuery(VERIFY_TOKEN);
    const [uploadFile] = useMutation(SINGLE_UPLOAD);
    const [loading, setLoading] = useState(true);

    const getUserDataFromToken = async () => {
        const accessToken = cookies.get('accessToken');
        if (!accessToken) {
            console.error("Access token not found in cookies");
            return null;
        }

        try {
            console.log('accessToken:  ' + accessToken)
            const { data } = await verifyToken({ variables: { token: accessToken, type: TokenType.ACCESS } })
            console.log('response data is:')
            console.log(data)
            if (!data) {
                console.error("Decoded token is null");
                return null;
            }
            console.log('UserID1 is')
            console.log(data)
            return data;
        } catch (err) {
            console.error("Error decoding token:", err);
            return null;
        }
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfoState({
            ...userInfo,
            name: event.target.value
        });

        dispatch(setUserInfo({
            name: event.target.value
        }))
    }

    const handleChangeGmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfoState({
            ...userInfo,
            gmail: event.target.value
        });

        dispatch(setUserInfo({ gmail: event.target.value }))
    }


    const handleChangeCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value)
        dispatch(setCurrentPasswordInfo({ currentPassword: event.target.value }))
    }

    const handleChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value)
        dispatch(setNewPasswordInfo({ newPassword: event.target.value }))
    }

    const handleImg = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        let encryptedPath;

        if (file) {
            console.log("Выбранный файл:", file);
            console.log('File received:', file);
            console.log(file.name); // Имя файла
            console.log(file.size); // Размер файла
            console.log(file.type); // MIME тип файла
            console.log(file.lastModified); // Время последнего изменени

            const { data } = await uploadFile({ variables: { file: file } })

            console.log('response data is:')
            console.log(data)

            if (data.singleUpload) {
                encryptedPath = CryptoJS.AES.encrypt(`${initialImageFilePath}${file.name}`, SECRET_KEY).toString();
                localStorage.setItem("encryptedAvatarImagePath", encryptedPath);
                setImagePath(`${initialImageFilePath}${file.name}`);

                console.log(encryptedPath)
            } else {
                console.error("Failed to upload file");
            }

            console.log(file.name)
        };
    }

    useEffect(() => {
        console.log('Effect is running');

        const encryptedPath = localStorage.getItem("encryptedAvatarImagePath");

        if (encryptedPath) {
            try {
                const decryptedBytes = CryptoJS.AES.decrypt(encryptedPath, SECRET_KEY);
                const decryptedPath = decryptedBytes.toString(CryptoJS.enc.Utf8);
                setImagePath(decryptedPath);
            } catch (error) {
                console.error("Error decrypting image path:", error);
            }
        }

        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                const tokenResponse = await getUserDataFromToken();

                const userResponse = tokenResponse.verifyToken.user

                if (!tokenResponse) {
                    console.error("Failed to fetch user info");
                    return;
                }

                const decryptedBytes = CryptoJS.AES.decrypt(userResponse.gmail, SECRET_KEY);
                const decryptedEmail = decryptedBytes.toString(CryptoJS.enc.Utf8);

                if (tokenResponse) {
                    dispatch(setUserInfo({
                        name: userResponse.name,
                        gmail: decryptedEmail,
                    }))

                    setUserInfoState({
                        name: userResponse.name,
                        gmail: decryptedEmail,
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Box sx={{ width: '100%', height: '90vh', padding: '2% 2%' }}>
            <Box sx={{ width: '100%', height: '35%', display: 'flex', gap: '3%', padding: '1% 1%' }}>
                <Button sx={{
                    minWidth: '300px', maxWidth: '400px', height: '100%', padding: '2%', border: '1px solid #D6D6D6', borderRadius: '25px', justifyContent: 'flex-end', color: 'white',
                    alignItems: 'flex-start', '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }} onClick={handleImg}>
                    {!imagePath ? (
                        <Box sx={{ width: '100%', height: '13%', display: 'flex', justifyContent: 'flex-end' }}>
                            <img src="/assets/images/addImage_Icon.png" alt="" />
                        </Box>) : (<Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={imagePath} style={{
                                maxWidth: '100%',
                                maxHeight: '100%', objectFit: 'contain'
                            }} alt="" />
                        </Box>)}
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <Box sx={{ width: '100%', minHeight: '65%' }}>
                    <Box sx={{ width: '100%', height: '100%', border: '1px solid #D6D6D6', borderRadius: '25px', padding: '5%', display: 'grid', gap: '3%', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>

                        <CustomTextField
                            noBorder={false}
                            value={userInfo.name}
                            label='Name'
                            variant='outlined'
                            size='medium'
                            onChange={handleChangeName}
                        />

                        <CustomTextField
                            noBorder={false}
                            value={userInfo.gmail}
                            label='Gmail'
                            variant='outlined'
                            size='medium'
                            onChange={handleChangeGmail}
                        />

                        <CustomTextField
                            noBorder={false}
                            value={currentPassword}
                            label='Current Password'
                            variant='outlined'
                            size='medium'
                            onChange={handleChangeCurrentPassword}
                        />

                        <CustomTextField
                            noBorder={false}
                            value={newPassword}
                            label='New Password'
                            variant='outlined'
                            size='medium'
                            onChange={handleChangeNewPassword}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Profile;