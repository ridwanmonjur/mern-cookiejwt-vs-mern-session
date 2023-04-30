import { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { axiosFetch } from "../../api/fetch";
import { toast } from 'react-toastify';
export const TodoForm = ({
    currentTodo,
    mode,
    handleCurrentTodoIndex,
    addTodo,
    editTodo
}) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        if (mode === "ADD") {
            const response = await axiosFetch.post('/todo', data)
            await setTimeout(() => {
                setLoading(false);
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                addTodo({ ...response.data.data });
            }, 3000);
        }
        else {
            const response = await axiosFetch.put(`/todo/${currentTodo._id}`, { ...data, _id: currentTodo._id, date: currentTodo.date })
            await setTimeout(() => {
                setLoading(false);
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                editTodo({ ...data, _id: currentTodo._id, date: currentTodo.date });
            }, 3000);
        }
    }

    const formRef = useRef(null)
    return (
        <div>
            <h1 className='pt-12 pb-5 text-xl'>
                {mode === "ADD" ? <> Add Todos... </> : <> Edit Todos... </>}
            </h1>

            <form
                formRef={formRef}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">
                    <input
                        type="text"
                        defaultValue={currentTodo.title}
                        {...register("title")}
                        required
                        placeholder="Enter your title..."
                        className="input input-bordered dark:bg-white text-lg inline w-full  mb-2"
                    />
                    <textarea id="message"
                        defaultValue={currentTodo.description}
                        {...register("description")}
                        required
                        title="Enter your desc please"
                        placeholder="Enter your description please..."
                        className="textarea textarea-bordered dark:bg-white w-full text-lg"
                        rows={3}
                    ></textarea>
                    <div className="flex justify-center">
                        {
                            mode === "ADD" ?
                                <>
                                    <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add Todo
                                    </button>
                                </>
                                :
                                <>
                                    <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit Todo

                                    </button>
                                    <button className={`btn btn-primary mt-4 ml-5 ${loading ? "loading" : ""}`}
                                        onClick={() => { reset(); handleCurrentTodoIndex(-1); }}>
                                        Add mode
                                    </button>
                                </>
                        }
                    </div>

                </div>
            </form>
        </div>
    );
};
