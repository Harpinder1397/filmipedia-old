import { Select } from 'antd';
import './formFields.less';

const { Option } = Select;

const FormSelect = ({
	name,
	placeholder,
	value,
	onSelect = () => { },
	onDeselect = () => { },
	disabled = false,
	required = false,
	validationError,
	label,
	mode,
	showSearch = false,
	options = [],
	width = '100%',
	filterOption = () => { },
	onChange = () => { },
	onClear = () => { },
	className,
	allowClear,
	showFilterValue
}) => {

	return (
		<div className="select-container" style={{ width: width }}>
			{
				label ?
					<div className="label-container">
						<span className="required">
							{required ? '*' : null}
						</span>
						<span className="label">
							{label}
						</span>
					</div> : null
			}

			<div className="input-field-container" >
				<Select
					name={name}
					placeholder={placeholder}
					value={value}
					onSelect={onSelect}
					onDeselect={onDeselect}
					disabled={disabled}
					required={required}
					mode={mode}
					showSearch={showSearch}
					filterOption={filterOption}
					className={`input-field ${className} ${validationError ? 'error' : ''}`}
					onChange={onChange}
					onClear={onClear}
					allowClear={allowClear}
				>
					{
						options?.map((option) => (
							showFilterValue ? option.value >= showFilterValue ? (
								<Option key={option?._id} id={option?._id} value={option?.value}>
									{option?.value}
								</Option>
								)
							: null : (
								<Option key={option?._id} id={option?._id} value={option?.value}>
									{option?.value}
								</Option>
							)
						))
					}
				</Select>
				{
					validationError ? 
					<div className="error-msg">
						{validationError}
					</div> : null
				}	
			</div>
		</div>

	)
}

export default FormSelect