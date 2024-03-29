import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getBooks, resetBooks } from "../../store/slice/bookSlice";
import { CATEGORY_SELECT_OPTIONS, SORT_SELECT_OPTIONS } from "../../config";
import style from "./form.module.scss";

export const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    function onSubmit(data) {
        const startIndex = 0;
        dispatch(resetBooks());
        dispatch(getBooks({...data, startIndex}));
        localStorage.setItem('data', JSON.stringify(data));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form_container}>

            <div className={style.form}>
                <input 
                    {...register('title', {required: true})}
                    aria-invalid={errors.title ? "true" : "false"} 
                    className={style.input} 
                    type="search" 
                    autoComplete="off"
                    placeholder="Enter book title ..."
                />

                <button className={style.button} type='submit'>Search</button>
            </div>

            <div className={style.errors_container}>
                {errors.title?.type === 'required' && <div className={style.error__text}>Enter book title</div>}
            </div>

            <div className={style.search_params}>
                <div className={style.categories}>
                    <h4>Categories:</h4>
                    <select {...register('category')} className={style.select}>
                        {CATEGORY_SELECT_OPTIONS.map((categoty, index) => <option key={index} value={categoty.value}>{categoty.name}</option>)}
                    </select>
                </div>

                <div className={style.categories}>
                    <h4>Sorting by:</h4>
                    <select {...register('sorting')} className={style.select}>
                        {SORT_SELECT_OPTIONS.map((element, index) => <option key={index} value={element.value}>{element.name}</option>)}
                    </select>
                </div>
            </div>

        </form>
    )
}