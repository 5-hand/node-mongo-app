import React,{useState} from 'react'
import styled from 'styled-components'
import { mediaMobile } from '../../styles/common'
import { calculate } from '../../styles/common'
import dummy from '../../styles/img/anonymous.png'

const ImageInputLabel = styled.label`
    display: block;
    text-align: center;
    font-size: 1.8rem;
    margin: 20px auto 0;
    border-radius: 5px;
    padding: 10px;
    color: #fff;
    background-color: #9370db;
    ${mediaMobile`
        font-size: ${calculate(15,320)}vw;
        margin-right: 0;
        padding: ${calculate(8,320)}vw 0;
    `}
`

const ImageBox = styled.div`
    width: 150px;
    margin: 0 auto;
`

const Image = styled.img`
    width: 150px;
    height: 150px;
`

const ImageWrapper = styled.div`
    border-radius: 50%
    overflow: hidden
`

const UserName = styled.p`
    text-align: center;
    padding: 30px 0 ;
    font-size: 3.0rem;
`

const ImageForm = (props) => {
    const { loginName } = props.AppReducer.user
    const [img,setImg] = useState()
    const [Flg,setFlg] = useState(true)

    const convertImage = (files) => {
        if(Flg) {
            const file = files[0]
            const reader = new FileReader()
            reader.addEventListener('load',() => {
                setImg(reader.result)
                props.upLoadThumbnail({
                    thumbnail:reader.result,
                    id: props.AppReducer.user.id
                })
                document.getElementById('imageFile').file = ""
            })
            reader.readAsDataURL(file)
        }else{

        }
    }
    const thumbnail = props.AppReducer.user.thumbnail ? props.AppReducer.user.thumbnail : dummy
    const text = img ? "変更を決定" : "写真を選択"
    return(
        <>
            <ImageBox>
                <ImageWrapper>
                    <Image src= {thumbnail} />
                </ImageWrapper>
                <input id="imageFile" type="file" accept="image/png,image/jpeg" hidden onChange={(e) => convertImage(e.target.files)}/>
                <ImageInputLabel htmlFor="imageFile">{text}</ImageInputLabel>
            </ImageBox>
            <UserName>
                {loginName}
            </UserName>
        </>
    )
}

export default ImageForm

                        

                       