import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import { activeFilterChanged, setFilters} from '../../actions';
import classNames from 'classnames';

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const {filters, activeFilter} = useSelector(state => state);
    
    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(setFilters(data)))
            .catch(err => console.log(err))
    }, []);
    
    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            return <button className={btnClass} 
                            onClick={() => dispatch(activeFilterChanged(name))} 
                            key={name} 
                            id={name}>
                        {label}
                    </button>
        })
        
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;